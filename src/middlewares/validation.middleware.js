import { body, validationResult } from "express-validator";
const validateRequest = async (req, res, next) => {
  //1.Setup rules for validation
  console.log(req.body);
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    // body("imageUrl").isURL().withMessage("Invalid Url"),
  ];

  //2.run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  //3.check if there are any errors after running the rules

  var validationErrors = validationResult(req);
  console.log(validationErrors);
  //4.if errors, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("add-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
};

export default validateRequest;
