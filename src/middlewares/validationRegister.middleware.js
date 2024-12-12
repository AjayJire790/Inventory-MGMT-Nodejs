import { body, validationResult } from "express-validator";

const validationRegister = async (req, res, next) => {
  //1.Setup rules for validation
  const rules = [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").custom((value, { req }) => {
      if (value.length < 4) {
        throw new Error("Password must be at least 4 characters");
      }
      return true;
    }),
  ];

  //2.run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  //3.check if there are any erors after running the rules

  var validationErrors = validationResult(req);
  //   console.log(validation);
  if (!validationErrors.isEmpty()) {
    return res.render("register", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};

export default validationRegister;
