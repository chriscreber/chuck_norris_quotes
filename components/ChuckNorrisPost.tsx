import React from 'react';

interface Props {
  icon_url: string;
  value: string;
  id: number;
}

export const ChuckNorrisPost: React.FC<Props> = ({
  icon_url,
  value,
  id,
}) => {
  return (
    <div key={id} className="shadow  max-w-md  rounded">
      <img src={icon_url} />
      <div className="p-5 flex flex-col space-y-2">
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
};
