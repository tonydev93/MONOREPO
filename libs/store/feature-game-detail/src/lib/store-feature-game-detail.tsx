import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatRating } from '@firstdemo/store/util-formatters';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Game } from '@firstdemo/api/util-interfaces';

/* eslint-disable-next-line */
export function StoreFeatureGameDetail(props: any) {
  const params = useParams()
  const [state, setState] = useState<{
    data: Game | null;
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: null,
    loadingState: 'success',
  });
  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    const gameId = params['id'];
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res.message,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, [params['id']]);
  return (
    <div className="container">
    {state.loadingState === 'loading' ? (
      'Loading...'
    ) : state.loadingState === 'error' ? (
      <div>Error fetching data</div>
    ) : state.data == null ? (
      ''
    ) : (
      <Card>
        <CardActionArea>
          <CardMedia
            className="game-card-media"
            image={state.data.image}
            title={state.data.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.data.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="game-rating"
            >
              <strong>Rating:</strong> {formatRating(state.data.rating)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )}
  </div>
  );
}

export default StoreFeatureGameDetail;


