const Habit = require("../models/habbit");

const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const habit = await Habit.create({
      title,
      description,
      frequency,
      owner: req.user._id,
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ owner: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const iscompleted = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date().toISOString().slice(0, 10);
    if (!habit.history.includes(today)) {
      habit.history.push(today);
      await habit.save();
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteroutes = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!habit) {
      return res.status(404).json({
        message: "habit doesn't found",
      });
    }
    await habit.deleteOne();
    res.json({
      message: "Habit deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
const editroutes = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!habit) {
      return res.status(404).json({
        message: "habit doesn't found",
      });
    }
    (habit.title = req.body.title ?? habit.title),
      (habit.description = req.body.description ?? habit.description),
      (habit.frequency = req.body.frequency ?? habit.frequency);

    await habit.save();
    res.json(habit);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createHabit,
  getHabits,
  iscompleted,
  deleteroutes,
  editroutes,
};
