import useSWR from 'swr';
import Tile from './components/tile';


type Data = {
  name: string,
  path: string,
  description: string
}


export default function Home() {
  const { data, error } = useSWR('/api/all_images', fetcher);
  let galery = <h1>Loading...</h1>
  if (data) {
    galery = (
      data.map((imgData: Data, i: string) =>
        <Tile
          key={i}
          imgPath={imgData.path}
          imgName={imgData.name}
          imgDescription={imgData.description}
        />)
    )
  }

  return (
    <main >
      <section className="py-5">
        <div className="container" id="main-galery">
          <div className="row">
            {galery}
          </div>
        </div>
      </section>
    </main >
  )
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
