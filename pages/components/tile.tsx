import * as React from "react";
import Image from 'next/image';
import { useRouter } from "next/router";


type Props = {
    imgId: string,
    imgPath: string,
    imgDescription: string
}


const Tile: React.FC<Props> = ({ imgId, imgPath, imgDescription }) => {
    let router = useRouter()

    const redirectToDetails = async () => { router.push(`/nft/${imgId}`) }

    return (
        <div className="col-6 col-md-4 bg-image hover-effect">
            <Image className="w-full h-auto"
                src={imgPath}
                alt={imgDescription}
                width={1024}
                height={1024}
                onClick={redirectToDetails} />
        </div>
    );
};

export default Tile;