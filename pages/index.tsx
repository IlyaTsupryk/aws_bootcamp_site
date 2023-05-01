import useSWR from 'swr';
import Tile from './components/tile';
import NewButton from './components/new_button';


type Data = {
  id: string,
  name: string,
  description: string,
  url: string,
  owner: string,
  size: string,
  price: string
}


export default function Home() {
  let { data, error } = useSWR('http://127.0.0.1:8080/nfts', fetcher);
  let galery = <h1>Loading...</h1>
  if (data) {
    galery = (
      data.map((imgData: Data, i: string) =>
        <Tile
          key={i}
          imgPath={imgData.url}
          imgId={imgData.id}
          imgDescription={imgData.description}
        />)
    )
  }

  const location_info = { data: { region: "local", zone: "local" } }  //useSWR('/api/location', fetcher);
  let location_section = <div className="col5"></div>
  if (location_info && location_info.data) {
    location_section = (
      <div className="col5">
        Region: {location_info.data.region}. Availability zone: {location_info.data.zone}
      </div>
    );
  }

  return (
    <main >
      <section className="py-5">
        <div className="container" id="main-galery">
          <div className="row">
            <div className="col-8">
              {location_section}
            </div>
            <div className="col-4">
              <NewButton />
            </div>
          </div>
          <div className="row">
            {galery}
          </div>
        </div>
      </section>
    </main >
  )
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
