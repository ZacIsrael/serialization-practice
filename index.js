import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
  let body = req.body;
  console.log("request's body = ", body);

  // converts the recipe JSON into an array of objects
  let recipeArr = JSON.parse(recipeJSON);

  // console.log("typeof(recipeArr) = ", typeof recipeArr);
  // console.log('Array.isArray(recipeArr) = ', Array.isArray(recipeArr))

  // console.log("recipeArr = ", recipeArr);
  // object with the correct food item that will be sent to the ejs file
  let data = {};

  // find the object where the recipe's protein = body.choice
  for (let i = 0; i < recipeArr.length; i++) {

    let recipeProtein = recipeArr[i].ingredients.protein.name.toLowerCase();
    console.log("recipeArr[i] = ", recipeArr[i]);
    console.log("recipeProtein = ", recipeArr[i].ingredients.protein.name.toLowerCase());
    console.log("body.choice = ", body.choice);


    if (recipeProtein === body.choice) {
      // found the correct object
      data = recipeArr[i];
      console.log('for loop: data = ', data);
    }
  }

  // may need the method of this request for filtering in the EJS file
  data.method = req.method;
  console.log("end of function: data = ", data);
  res.render("index", data);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
