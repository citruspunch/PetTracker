import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/sign-up": {};
  "/dashboard": {};
  "/my-pets": {};
  "/pet/:petId": {
    "petId": string;
  };
  "/edit-pet/:petId": {
    "petId": string;
  };
  "/report-lost-pet": {};
  "/report-lost-pet/:petId": {
    "petId": string;
  };
  "/report-found-pet/:petId": {
    "petId": string;
  };
  "/edit-user": {};
  "/update-password": {};
  "/verify-email": {};
  "/lost-pets": {};
  "/reset-password": {};
};