import type { NextApiRequest, NextApiResponse } from 'next';
var AWS = require('aws-sdk');

type Data = {
    region: string,
    zone: string,
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    AWS.config.update({ region: "us-west-2" });
    var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
    console.log("Region name", process.env.AWS_REGION || "us-central-1");

    const params = {
        DryRun: false
    };
    ec2.describeInstances(params, function (err: any, data: any) {
        if (err) {
            console.log("Error", err.stack);
        } else {
            console.log("Success", JSON.stringify(data));
        }
    });
    res.status(200).json(JSON.parse("[]"));
}
