export default function Entry() {
  return (
    <>
      <main>
        <div className="card-container">
          <div className="img-container">
            <img
              src="/src/components/travelJourney/mont-fuji.png"
              alt="Mont Fuji"
            />
          </div>
          <div className="description-container">
            <div className="gps-coordinates">
              <div className="country">
                <img
                  src="/src/components/travelJourney/marker.svg"
                  alt="localisation of Mont Fuji"
                />
                <h6>JAPAN</h6>
              </div>
              <div className="localisation-spot">
                <a href="https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu">
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="other-information">
              <h3>Mount Fuji</h3>
              <p>12 Jan, 2021 - 24 Jan, 2021</p>
              <p>
                Mount Fuji is the tallest mountain in Japan, standing at 3,776
                meters (12,380 feet). Mount Fuji is the single most popular
                tourist site in Japan, for both Japanese and foreign tourists.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
