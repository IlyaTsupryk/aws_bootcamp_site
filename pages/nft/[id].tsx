import useSWR from 'swr';
import { useRouter } from "next/router"
import Image from 'next/image';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NFTPage() {
    const router = useRouter()
    const nft_name = router.query.id
    const { data, error } = useSWR(`/api/image_details?name=${nft_name}`, fetcher);
    if (data && data.path)
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-8'>
                        <h1 className='d-flex justify-content-center'>{data.description}</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <Image src={data.path} alt={data.description} width={1024} height={1024} className="w-full h-auto" />
                    </div>
                </div>
            </div >
        );
    else return <h2>Loading...</h2>;
}