import type { NextApiRequest, NextApiResponse } from 'next';
const child_process = require('child_process');
import { EC2 } from "@aws-sdk/client-ec2";

type Data = {
    region: string,
    zone: string,
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id_out = child_process.spawnSync("ec2metadata", ["--instance-id"]);
    const ec2_instance_id = id_out.stdout.toString('utf8').trim();

    let region_out = child_process.spawnSync("curl", ["http://169.254.169.254/latest/meta-data/placement/region"]);
    const region = region_out.stdout.toString('utf8').trim();

    var ec2_client = new EC2({ "region": region });

    const result = await ec2_client.describeInstances({ InstanceIds: [ec2_instance_id] });
    const placement = result.Reservations[0].Instances[0].Placement;

    res.status(200).json({ region: region, zone: placement.AvailabilityZone });
}
