const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

/* ================= AUTH ================= */

export const apiLogin = async (email: string, password: string) => {
  const data = await graphqlRequest<{
    login: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }>(
    `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        firstName
        lastName
      }
    }
    `,
    { email, password }
  );

  return data.login;
;
};

export const apiSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const data = await graphqlRequest<{
    createUser: {
      id: string;
      email: string;
    };
  }>(
    `
    mutation CreateUser($data: CreateUserInput!) {
      createUser(data: $data) {
        id
        email
      }
    }
    `,
    {
      data: { firstName, lastName, email, password },
    }
  );

  return data.createUser;
};
