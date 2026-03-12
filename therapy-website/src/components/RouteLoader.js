import React from 'react';
import ballImg from '../ball.jpg';

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="route-loader__ball-wrap" aria-hidden="true">
        <img src={ballImg} alt="" className="route-loader__ball" />
      </div>
    </div>
  );
}

export default RouteLoader;
