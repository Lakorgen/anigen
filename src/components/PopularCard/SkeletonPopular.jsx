import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
 <div className="popular__card">
    <ContentLoader
      speed={2}
      width={135}
      height={244}
      viewBox="0 0 135 244"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="135" height="189" />
      <rect x="5" y="194" rx="0" ry="0" width="127" height="17" />
      <rect x="6" y="220" rx="0" ry="0" width="110" height="14" />
    </ContentLoader>
 </div>
);

export default MyLoader;
