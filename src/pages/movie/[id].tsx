import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import { Meta } from '../../components/ui';
import { fetchMovieById } from '../../API/movieRequests';
import { Movie } from '../../types';
import MovieDetailsContent from '../../components/movieDetailsContent/index.web';

const MovieDetails: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data: movie, backLink }) => {
  const { back } = useRouter();

  return (
    <Meta title={`${movie?.title} page`} description={`${movie?.title} page`}>
      {movie && (
        <MovieDetailsContent movie={movie} backLink={backLink} goBack={back} />
      )}
    </Meta>
  );
};

export default MovieDetails;

type PropsType = { data?: Movie; backLink: string };

export const getServerSideProps: GetServerSideProps<PropsType> = async (
  context: GetServerSidePropsContext,
) => {
  const movieId = (context?.params?.id as string) || '';
  const backLink = (context?.query?.backLink as string) || '/';

  const data = await fetchMovieById(movieId);

  return {
    props: {
      data,
      backLink,
    },
  };
};
