// const { useScrollTrigger } = require("@mui/material");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/nivara")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hashedpassword: {
    type: String,
    required: true,
  },
});
const ProjectSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  members: {
    type: Number,
    required: true,
  },
  client: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  history: [
    {
      date: {
        type: Date,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        // enum: ['pending', 'in_progress', 'completed', 'document'], // Add 'document' as an option
        required: true,
      },
    },
  ],
});


const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hashedpassword: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admins", AdminSchema);
const Client = mongoose.model("Clients", ClientSchema);
const Project = mongoose.model("Projects", ProjectSchema);

module.exports = {
  Admin: Admin,
  Client: Client,
  Project: Project,
};
