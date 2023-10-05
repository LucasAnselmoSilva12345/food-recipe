interface FoodInfoProps {
  strCategory: string;
  strArea: string;
  strTags: string;
}

export function FoodInfo({ strCategory, strArea, strTags }: FoodInfoProps) {
  return (
    <div className="my-2 flex flex-col md:items-center md:justify-between md:flex-row space-y-2 md:space-y-0">
      <p className="text-neutral-900 text-lg font-inter font-bold">
        Categoria: <span className="font-normal">{strCategory}</span>{' '}
      </p>

      <p className="text-neutral-900 text-lg font-inter font-bold">
        Area: <span className="font-normal">{strArea}</span>{' '}
      </p>

      <p className="text-neutral-900 text-lg font-inter font-bold">
        Tags: <span className="font-normal">{strTags}</span>{' '}
      </p>
    </div>
  );
}
