import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendConstruct } from "./cloudfront";
import { Pipeline } from "./pipeline";

export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const frontendConstruct = new FrontendConstruct(this, "PersonalWebsite");

    // ********** Create the Pipeline stack **********
    new Pipeline(this, "PersonalWebsitePipeline", {
      frontendConstruct,
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
    });
  }
}
