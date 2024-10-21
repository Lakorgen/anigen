import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonProfile = (props) => (
  <div className="profile__card">
    <ContentLoader
      speed={2}
      width={135}
      height={244}
      viewBox="0 0 135 244"
      backgroundColor="#fff"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="135" height="189" />
      <rect x="5" y="194" rx="0" ry="0" width="127" height="17" />
      <rect x="6" y="220" rx="0" ry="0" width="110" height="14" />
    </ContentLoader>
  </div>
);

export default SkeletonProfile;
