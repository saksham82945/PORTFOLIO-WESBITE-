import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../../components/ContactForm';

// Mock the api module
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), handlers: [] },
      response: { use: vi.fn(), handlers: [] },
    },
  },
}));

// Mock personalData
vi.mock('../../data/personalData', () => ({
  PERSONAL: {
    name: 'Test User',
    email: 'test@test.com',
  },
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText(/saksham kumar/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/build something awesome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell me about/i)).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    render(<ContactForm />);

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Subject is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('should show invalid email error', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText(/you@example.com/i);
    await user.type(emailInput, 'not-an-email');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('should clear individual field errors when user types', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Trigger validation errors
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();

    // Type in the name field
    const nameInput = screen.getByPlaceholderText(/saksham kumar/i);
    await user.type(nameInput, 'John');

    // Name error should be cleared
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    const { default: api } = await import('../../utils/api');
    api.post.mockResolvedValueOnce({ data: { message: 'Sent!', id: '123' } });

    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/saksham kumar/i), 'John Doe');
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'john@test.com');
    await user.type(screen.getByPlaceholderText(/build something awesome/i), 'Test Subject');
    await user.type(screen.getByPlaceholderText(/tell me about/i), 'Test message content');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent to the stars/i)).toBeInTheDocument();
    });

    expect(api.post).toHaveBeenCalledWith('/contact', {
      name: 'John Doe',
      email: 'john@test.com',
      subject: 'Test Subject',
      message: 'Test message content',
    });
  });

  it('should render all required field labels', () => {
    render(<ContactForm />);

    expect(screen.getByText('NAME *')).toBeInTheDocument();
    expect(screen.getByText('EMAIL *')).toBeInTheDocument();
    expect(screen.getByText('SUBJECT *')).toBeInTheDocument();
    expect(screen.getByText('MESSAGE *')).toBeInTheDocument();
  });
});
