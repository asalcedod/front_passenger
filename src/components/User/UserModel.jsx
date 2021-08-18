export const UserModel = [
  {
    id: "identification",
    name: "Identification",
    type: "text",
    form: true,
    grid: true,
  },
  {
    id: "username",
    name: "Username",
    type: "text",
    form: true,
    grid: true,
  },
  {
    id: "name",
    name: "Name",
    type: "text",
    form: true,
    grid: true,
  },
  {
    id: "email",
    name: "Email",
    type: "email",
    form: true,
    grid: true,
  },
  {
    id: "password",
    name: "Password",
    type: "password",
    form: true,
    grid: false,
  },
  {
    id: "position",
    name: "Position",
    type: "position",
    form: true,
    grid: false,
  },
  {
    id: "status",
    name: "Status",
    type: "select",
    options: [
      {
        name: "Active",
        value: "1",
      },
      {
        name: "Inactive",
        value: "0",
      },
    ],
    form: true,
    grid: true,
  },
  {
    id: "actions",
    name: "Actions",
    type: "text",
    form: false,
    grid: true,
  },
  {
    id: "childrens",
    name: "Childrens",
    children: {
      rolID: null,
    },
    form: false,
    grid: false,
  },
];
