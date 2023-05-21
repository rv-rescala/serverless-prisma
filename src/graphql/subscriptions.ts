/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatedUser = /* GraphQL */ `
  subscription OnCreatedUser($id: Int, $email: AWSEmail) {
    onCreatedUser(id: $id, email: $email) {
      id
      email
      fullname
      comment
      age
      hoge
      orders {
        id
        author {
          id
          email
          fullname
          comment
          age
          hoge
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;
export const onUpdatedUser = /* GraphQL */ `
  subscription OnUpdatedUser($id: Int, $email: AWSEmail) {
    onUpdatedUser(id: $id, email: $email) {
      id
      email
      fullname
      comment
      age
      hoge
      orders {
        id
        author {
          id
          email
          fullname
          comment
          age
          hoge
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;
export const onUpsertedUser = /* GraphQL */ `
  subscription OnUpsertedUser($id: Int, $email: AWSEmail) {
    onUpsertedUser(id: $id, email: $email) {
      id
      email
      fullname
      comment
      age
      hoge
      orders {
        id
        author {
          id
          email
          fullname
          comment
          age
          hoge
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;
export const onDeletedUser = /* GraphQL */ `
  subscription OnDeletedUser($id: Int, $email: AWSEmail) {
    onDeletedUser(id: $id, email: $email) {
      id
      email
      fullname
      comment
      age
      hoge
      orders {
        id
        author {
          id
          email
          fullname
          comment
          age
          hoge
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;
export const onMutatedUser = /* GraphQL */ `
  subscription OnMutatedUser($id: Int, $email: AWSEmail) {
    onMutatedUser(id: $id, email: $email) {
      id
      email
      fullname
      comment
      age
      hoge
      orders {
        id
        author {
          id
          email
          fullname
          comment
          age
          hoge
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;
export const onCreatedManyUsers = /* GraphQL */ `
  subscription OnCreatedManyUsers {
    onCreatedManyUsers {
      count
    }
  }
`;
export const onUpdatedManyUsers = /* GraphQL */ `
  subscription OnUpdatedManyUsers {
    onUpdatedManyUsers {
      count
    }
  }
`;
export const onMutatedManyUsers = /* GraphQL */ `
  subscription OnMutatedManyUsers {
    onMutatedManyUsers {
      count
    }
  }
`;
export const onDeletedManyUsers = /* GraphQL */ `
  subscription OnDeletedManyUsers {
    onDeletedManyUsers {
      count
    }
  }
`;
export const onCreatedOrder = /* GraphQL */ `
  subscription OnCreatedOrder($id: Int) {
    onCreatedOrder(id: $id) {
      id
      author {
        id
        email
        fullname
        comment
        age
        hoge
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatedOrder = /* GraphQL */ `
  subscription OnUpdatedOrder($id: Int) {
    onUpdatedOrder(id: $id) {
      id
      author {
        id
        email
        fullname
        comment
        age
        hoge
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const onUpsertedOrder = /* GraphQL */ `
  subscription OnUpsertedOrder($id: Int) {
    onUpsertedOrder(id: $id) {
      id
      author {
        id
        email
        fullname
        comment
        age
        hoge
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const onDeletedOrder = /* GraphQL */ `
  subscription OnDeletedOrder($id: Int) {
    onDeletedOrder(id: $id) {
      id
      author {
        id
        email
        fullname
        comment
        age
        hoge
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const onMutatedOrder = /* GraphQL */ `
  subscription OnMutatedOrder($id: Int) {
    onMutatedOrder(id: $id) {
      id
      author {
        id
        email
        fullname
        comment
        age
        hoge
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const onCreatedManyOrders = /* GraphQL */ `
  subscription OnCreatedManyOrders {
    onCreatedManyOrders {
      count
    }
  }
`;
export const onUpdatedManyOrders = /* GraphQL */ `
  subscription OnUpdatedManyOrders {
    onUpdatedManyOrders {
      count
    }
  }
`;
export const onMutatedManyOrders = /* GraphQL */ `
  subscription OnMutatedManyOrders {
    onMutatedManyOrders {
      count
    }
  }
`;
export const onDeletedManyOrders = /* GraphQL */ `
  subscription OnDeletedManyOrders {
    onDeletedManyOrders {
      count
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
