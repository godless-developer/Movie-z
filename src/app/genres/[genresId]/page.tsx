import { TOKEN } from "@/app/utils/constants";
import { Genres, MovieTypes } from "@/app/utils/types";
import { Pagination } from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import Link from "next/link";

export default async function ({
  params: { genresId },
}: {
  params: { genresId: string };
}) {
  const genresData = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: {
        Authorization: `bearer  ${TOKEN}`,
        "Content-type": "application/json",
      },
    }
  );
  const datagenres = await genresData.json();
  console.log(datagenres);

  const genresAllData = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genresId}&page=1`,
    {
      headers: {
        Authorization: `bearer  ${TOKEN}`,
        "Content-type": "application/json",
      },
    }
  );
  const dataAllgenres = await genresAllData.json();
  console.log(dataAllgenres);
  return (
    <div className="w-[1440px] h-full flex flex-col items-center  mt-5">
      <div className="w-[1280px] h-full flex flex-col items-start gap-8">
        <p className="text-secondary-foreground text-[30px] normal font-semibold ">
          Search filter
        </p>
        <div className="flex items-start self-stretch gap-1 h-full">
          <div className="w-[387px] flex flex-col items-start gap-5 text-secondary-foreground sticky top-[100px]">
            <div className="w-[213px] flex flex-col items-start gap-1">
              <p className="text-[24px] normal font-semibold">Genres</p>
              <p className="text-[16px] normal font-normal ">
                See lists of movies by genre
              </p>
            </div>
            <div className="w-[387px] flex items-start content-start gap-4 self-stretch flex-wrap">
              {datagenres.genres.map((movie: MovieTypes, index: number) => {
                return (
                  <ToggleGroup
                    type="single"
                    className=" rounded-lg border-[1px] h-[22px] font-normal text-[14px] flex gap-1 items-center cursor-pointer text-secondary-foreground"
                  >
                    <ToggleGroupItem value="a" className="h-[20px]">
                      <p>{movie.name}</p>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </ToggleGroupItem>
                  </ToggleGroup>
                );
              })}
            </div>
          </div>
          <div className="w-[2px] h-[1830px] flex flex-col py-4 gap-[10px] self-stretch ml-8 mr-4 bg-secondary"></div>
          <div className="w-[806px] flex flex-col items-start gap-8 h-full">
            <p className="flex  items-start gap-2 text-[20px] font-medium ">
              {dataAllgenres.total_results}
              <p>titles</p>
            </p>
            <div className="w-[806px] h-full flex flex-wrap items-start self-stretch gap-8">
              {dataAllgenres.results
                .slice(0, 20)
                .map((movie: MovieTypes, index: number) => {
                  return (
                    <Link href={`/${movie.id}`}>
                      <div
                        key={index}
                        className="rounded-[8px] overflow-hidden w-[165px] h-[330px] flex flex-col items-start cursor-pointer"
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                          alt={`Poster of ${movie?.original_title}`}
                          width={500}
                          height={750}
                        />
                        <div className="bg-secondary flex p-2 flex-col items-start self-stretch h-full">
                          <div className="flex gap-[2px] items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66658 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
                                fill="yellow"
                                stroke="yellow"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p>
                              {movie?.vote_average.toFixed(1)}
                              <span className="text-[#71717a] text-[12px]">
                                /10
                              </span>
                            </p>
                          </div>
                          <p>{movie?.original_title}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
