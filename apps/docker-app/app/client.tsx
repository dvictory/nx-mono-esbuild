'use client';

import React, { useState, useEffect } from 'react';

function DataDisplayComponent() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.text())
      .then((data) => setData(data));
  }, []);

  return <div>{data ? data : 'Loading...'}</div>;
}

export default DataDisplayComponent;
