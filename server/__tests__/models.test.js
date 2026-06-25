import { describe, it, expect } from '@jest/globals';
import Admin from '../models/Admin.js';
import { setupDB } from './setup.js';

setupDB();

describe('Admin Model', () => {
  it('should hash the password on save', async () => {
    const admin = await Admin.create({
      email: 'hash-test@test.com',
      password: 'PlainTextPassword123',
      name: 'Hash Tester',
    });

    // Password should not be stored as plain text
    expect(admin.password).not.toBe('PlainTextPassword123');
    // bcrypt hashes start with $2a$ or $2b$
    expect(admin.password).toMatch(/^\$2[ab]\$/);
  });

  it('should return true for correct password via matchPassword', async () => {
    const admin = await Admin.create({
      email: 'match-test@test.com',
      password: 'CorrectPassword!',
      name: 'Match Tester',
    });

    const isMatch = await admin.matchPassword('CorrectPassword!');
    expect(isMatch).toBe(true);
  });

  it('should return false for incorrect password via matchPassword', async () => {
    const admin = await Admin.create({
      email: 'wrong-test@test.com',
      password: 'CorrectPassword!',
      name: 'Wrong Tester',
    });

    const isMatch = await admin.matchPassword('WrongPassword!');
    expect(isMatch).toBe(false);
  });

  it('should not re-hash password on save if not modified', async () => {
    const admin = await Admin.create({
      email: 'rehash-test@test.com',
      password: 'Original123',
      name: 'Rehash Tester',
    });

    const originalHash = admin.password;
    admin.name = 'Updated Name';
    await admin.save();

    expect(admin.password).toBe(originalHash);
  });

  it('should enforce unique email', async () => {
    await Admin.create({
      email: 'unique@test.com',
      password: 'Pass123',
      name: 'First',
    });

    await expect(
      Admin.create({
        email: 'unique@test.com',
        password: 'Pass456',
        name: 'Second',
      })
    ).rejects.toThrow();
  });

  it('should default name to Admin', async () => {
    const admin = await Admin.create({
      email: 'default-name@test.com',
      password: 'Pass123',
    });

    expect(admin.name).toBe('Admin');
  });
});
