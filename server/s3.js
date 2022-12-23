const dotenv = require("dotenv");
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = "us-east-1";
const bucketName = "testbucket17320";
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETACCESSKEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

//60 seconds before it expires
async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = { generateUploadURL };
