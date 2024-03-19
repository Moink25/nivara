const express = require("express");
const collection = require("./mongo");
const Admin = collection.Admin;
const Client = collection.Client;
const Project = collection.Project;
// const path = require('path');
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const fs = require("fs");
const multer = require("multer");


const upload = multer({ dest: 'uploads/' });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'public' directory
app.use("public", express.static(path.join(__dirname, "public")));

// app.get("/", cors(), (req, res) => {
//   // Your logic for the "/" route
// });

app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.Admin.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        password.trim(),
        user.hashedpassword.trim()
      );

      console.log(passwordMatch);

      if (passwordMatch) {
        res.json("exist");
      } else {
        res.json("wrongpassword");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/admin-signup", async (req, res) => {
  const { name, email, mobile, address, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    name: name,
    email: email,
    mobile: mobile,
    address: address,
    password: password,
    hashedpassword: hashedPassword,
  };

  try {
    const check = await collection.Admin.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.Admin.insertMany([data]);
    }
  } catch (e) {
    // res.json("fail");
  }


});
app.post("/client-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.Client.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        password.trim(),
        user.hashedpassword.trim()
      );

      console.log(passwordMatch);

      if (passwordMatch) {
        res.json("exist");
      } else {
        res.json("wrongpassword");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/client-signup", async (req, res) => {
  const { name, email, mobile, address, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    name: name,
    email: email,
    mobile: mobile,
    address: address,
    password: password,
    hashedpassword: hashedPassword,
  };

  try {
    const check = await collection.Client.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.Client.insertMany([data]);
    }
  } catch (e) {
    // res.json("fail");
  }


});


app.post("/add-project", upload.single('statusDocument'), async (req, res) => {
  const { email, name, date, members, budget, client_name, client_email,status } = req.body;

  // Retrieve file information
  // const statusDocument = req.file;

  // Check if all required fields are present
  if (!email || !name || !date || !members || !budget || !client_name || !client_email) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  // Construct project data
  const data = {
    email: email,
    name: name,
    date: date,
    members: members,
    budget: budget,
    client: {
      name: client_name,
      email: client_email
    },
   history:{
    date:date,
    percentage:0,
    status:status,
   },
  };

  try {
    const check = await Project.findOne({ name: name });

    if (check) {
      return res.json("exist");
    } else {
      await Project.create(data); // Create the project
      return res.json("notexist");
    }
  } catch (e) {
    console.error("Error adding project:", e);
    return res.status(500).json("Internal server error");
  }
});

app.get("/download-project-status/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project || !project.statusDocument) {
      return res.status(404).json('Project or status document not found');
    }

    // Set response headers for file download
    res.download(project.statusDocument);
  } catch (e) {
    console.error('Error downloading project status:', e);
    res.status(500).json('Internal server error');
  }
});


app.post("/admin-projects", async (req, res) => {
  const { email } = req.body;

  try {
    const projects = await collection.Project.find({ email: email });

    const formattedProjects = projects.map(project => {
      const formattedDate = new Date(project.date).toLocaleString('en-US', { dateStyle: 'medium' });
      return {
        ...project._doc,
        date: formattedDate
      };
    });

    console.log(formattedProjects);

    if (formattedProjects.length > 0) {
      res.json(formattedProjects);
    } else {
      res.json("No projects found for the given email");
    }
  } catch (e) {
    console.error("Error fetching projects:", e);
    res.status(500).json("Internal server error");
  }
});
app.post("/client-projects", async (req, res) => {
  const { email } = req.body;

  try {
    const projects = await collection.Project.find({ 'client.email': email });

    const formattedProjects = projects.map(project => {
      const formattedDate = new Date(project.date).toLocaleString('en-US', { dateStyle: 'medium' });
      return {
        ...project._doc,
        date: formattedDate
      };
    });

    console.log(formattedProjects);

    if (formattedProjects.length > 0) {
      res.json(formattedProjects);
    } else {
      res.json("No projects found for the given email");
    }
  } catch (e) {
    console.error("Error fetching projects:", e);
    res.status(500).json("Internal server error");
  }
});


app.put('/update-project/', async (req, res) => {
  // const { projectId } = req.params;
  const { date, percentage, status,projectId } = req.body;

  try {
    const project = await collection.Project.findById(projectId);

    if (!project) {
      return res.status(404).json('Project not found');
    }

    project.history.push({date,percentage,status});

    const updatedProject = await project.save();

    res.json('success');
  } catch (e) {
    console.error('Error updating project:', e);
    res.status(500).json('Internal server error');
  }
});



app.post("/admin-profile", async (req, res) => {
  const { email } = req.body;

  try {
    const profile = await collection.Admin.find({ email: email });



    if (profile.length > 0) {
      res.json(profile);
    } else {
      res.json("No profile found for the given email");
    }
  } catch (e) {
    console.error("Error fetching projects:", e);
    res.status(500).json("Internal server error");
  }
});
app.post("/client-profile", async (req, res) => {
  const { email } = req.body;

  try {
    const profile = await collection.Client.find({ email: email });



    if (profile.length > 0) {
      res.json(profile);
    } else {
      res.json("No profile found for the given email");
    }
  } catch (e) {
    console.error("Error fetching projects:", e);
    res.status(500).json("Internal server error");
  }
});
// let products = [];

// Route to handle POST requests for adding products

// app.post("/fetchcategories", async (req, res) => {
//   try {
//     const categories = await collection.Category.find();
//     res.json(categories);
//     // console.log(categories);
//   } catch (error) {
//     console.log("error fetching" + error);
//     res.status(500).json("internal server error");
//   }
// });

// app.get("/:categoryId", async (req, res) => {
//   const { categoryId } = req.params;
//   try {
//     const category = await Category.findById(categoryId); // Populate associated products
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.json(category);
//   } catch (error) {
//     console.error("Error fetching category details:", error);
//     res.status(500).json({ message: "Error fetching category details" });
//   }
// });


// app.post("/addproducts", async (req, res) => {
//   const { name, url, cost, categoryId } = req.body;
//   console.log(req);

//   try {
//     // Check if category exists
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(400).json({ message: "Invalid category ID" });
//     }

//     category.detail.push({ name, url, cost });
//     await category.save();

//     res.status(201).json({ message: "Product added successfully" });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ message: "Internal server error" }); // Generic error for client
//   }
// });

// const User = require("./mongo").User; // Import the User model

// app.post("/profile", async (req, res) => {
//   try {
//     const userEmail = req.query.email; // Use req.query.email for query parameters
//     const user = await User.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // routes/orderRoutes.js
// app.post("/order", async (req, res) => {
//   const { items, user, total } = req.body;

//   try {
//     // Check if there is an existing order for the user
//     const existingOrder = await collection.Orders.findOne({ user });

//     if (existingOrder) {
//       return res.status(400).json({ message: "Order already exists for this user" });
//     }

//     // Create a new order
//     const newOrder = {
//       items,
//       user,
//       total,
//     };

//     // Save the order to the database
//     await collection.Orders.insertMany([newOrder]);

//     res.status(201).json({ message: "Order placed successfully" });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
