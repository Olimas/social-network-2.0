import React from "react";
import Preloader from "../components/common/preloader/Preloader";

export function witchSuspense<WCP> (WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return <React.Suspense fallback={<div><Preloader/> Loading...</div>}>
      <WrappedComponent {...props} />
    </React.Suspense>
  };
}
