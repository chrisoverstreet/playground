import { APIGatewayProxyEventBase } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventBase<{
    iam: { cognitoIdentity: { identityId: string } };
  }>
) => {
  return {
    statusCode: 200,
    body: `Hello ${event.requestContext.authorizer.iam.cognitoIdentity.identityId}!`,
  };
};
