import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/login": {};
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
  "/lost-pets": {};
};