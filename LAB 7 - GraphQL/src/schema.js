import { createSchema } from 'graphql-yoga'
import axios from 'axios'

async function getRestUsersList() {
  try {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users")
    console.log(users);
    return users.data.map(({ id, name, username, email, address,
    phone, website, company }) => ({
      id: id,
      name: name,
      username: username,
      email: email,
      address: address,
      phone: phone,
      website: website,
      company: company
    }))
  } catch (error) {
    throw error
  }
}

async function getRestTodosList() {
  try {
    const todos = await axios.get("https://jsonplaceholder.typicode.com/todos")
    console.log(todos);
    return todos.data.map(({ id, userId, title, completed }) => ({
      id: id,
      userId: userId,
      title: title,
      completed: completed,
    }))
  } catch (error) {
    throw error
  }
}

async function todoById(parent, args, context, info) {
  const todosList = await getRestTodosList();
  return todosList.find(t => t.id == args.id);
}

async function userById(parent, args, context, info) {
  const users = await getRestUsersList();
  return users.find(u => u.id == args.id);
}


export const schema = createSchema({
  typeDefs: /* GraphQL */ `
   type Query {
     users: [User!]!
     todos: [ToDoItem!]!
     todo(id: ID!): ToDoItem
     user(id: ID!): User
   }
   type ToDoItem { 
     id: ID! 
     userId: String!
     title: String! 
     completed: Boolean! 
   }
   type User {
     id: ID!
     name: String!
     username: String
     email: String
     address: Address
     phone: String
     website: String
     company: Company
     todos: [ToDoItem!]!
     todo(id: ID!): ToDoItem
   }
   type Address {
     street: String!
     suite: String!
     city: String!
     zipcode: String!
     geo: Geo!
   }
   type Geo {
     lat: String!
     lng: String!
   }
   type Company {
     name: String!
     catchPhrase: String!
     bs: String!
   }
   type Todo {
    id: ID!
    userId: ID!
    title: String!
    completed: Boolean!
  }
`,
  resolvers: {
    Query: {
      users: async () => getRestUsersList(),
      todos: async () => getRestTodosList(),
      todo: (parent, args, context, info) => todoById(parent, args, context, info),
      user: (parent, args, context, info) => userById(parent, args, context, info),
    },
    User: {
      todos: async (parent, args, context, info) => {
        const todosList = await getRestTodosList();
        return todosList.filter(t => t.userId == parent.id);
      },
      todo: async (parent, args, context, info) => {
        const todosList = await getRestTodosList();
        const userTodos = todosList.filter(t => t.userId == parent.id);
        return userTodos.find(t => t.id == args.id);
      }      
    }
  }
})