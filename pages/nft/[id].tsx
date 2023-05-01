import useSWR from 'swr';
import { NextRouter, useRouter } from "next/router"
import Image from 'next/image';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NFTPage() {
    const router = useRouter()
    const nft_id = router.query.id
    const { data, error } = useSWR(`http://127.0.0.1:8080/nft/${nft_id}`, fetcher);
    if (data && data.url)
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-8'>
                        <h1 className='d-flex justify-content-center'>{data.description}</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'>
                        <Image src={data.url}
                            alt={data.description}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className='col-3'>
                        <div className='container'>
                            <div className='row'>
                                <button type="button"
                                    className="btn btn-primary col-5 m-1"
                                    onClick={() => DownloadFromBucket(`http://127.0.0.1:8080/download_nft?path="${data.url}"`)}>
                                    Download
                                </button>
                                <button type="button"
                                    className="btn btn-danger col-5 m-1"
                                    onClick={() => DeleteNft(`http://127.0.0.1:8080/nft/${nft_id}`, router)}>
                                    Delete
                                </button>
                            </div>
                            <div className='row mt-5'><h4>Image info:</h4></div>
                            <div className='row'>Owner: {data.owner}</div>
                            <div className='row'>Price: {data.price}$</div>
                            <div className='row'>Size: {data.size}</div>
                        </div>
                    </div>
                </div>
            </div >
        );
    else return <h2>Loading...</h2>;
}


const DownloadFromBucket = async (url: string) => {
    const file_name = url.split('\\').pop().split('/').pop().replace(/['"]+/g, '');
    const result = await fetch(url, { method: 'GET' });
    const blob = await result.blob();

    let url_tmp = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url_tmp;
    a.download = file_name;

    a.click();
    a.remove();
}

const DeleteNft = async (url: string, router: NextRouter) => {
    const result = await fetch(url, { method: 'DELETE' });
    if (result.status == 200) {
        router.push("/");
    }
}