import { StackContext, Api, Auth } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
    },
    routes: {
      "GET /private": "functions/private.handler",
      "GET /public": {
        function: "functions/public.handler",
        authorizer: "none",
      },
      "GET /": "functions/lambda.handler",
    },
  });

  const auth = new Auth(stack, "Auth", {
    login: ["email"],
  });
  auth.attachPermissionsForAuthUsers([api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId || "–",
    UserPoolClientId: auth.userPoolClientId,
  });
}
