import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    // Destructure only expected fields — prevents mass-assignment
    const { title, description, category, tags, image, githubUrl, liveUrl, featured, date } = req.body;
    const project = await Project.create({ title, description, category, tags, image, githubUrl, liveUrl, featured, date });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, category, tags, image, githubUrl, liveUrl, featured, date } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, category, tags, image, githubUrl, liveUrl, featured, date },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
