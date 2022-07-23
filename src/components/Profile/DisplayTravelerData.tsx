import Grid from "@mui/material/Grid";
// import { ITravelerShowProps } from '../../config/interfaces/ITravelerShowProps.interface'
import { ITravelerReviewShowProps } from "../../config/interfaces/ITravelerReviewShowProps.interface";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const DisplayTravelerData = ({ traveler }: ITravelerReviewShowProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        Gender:
      </Grid>
      <Grid item xs={6}>
        {traveler.gender}
      </Grid>
      <Grid item xs={6}>
        Date of Birth:
      </Grid>
      <Grid item xs={6}>
        {traveler.date_of_birth}
      </Grid>
      <Grid item xs={6}>
        National Id:
      </Grid>
      <Grid item xs={6}>
        {traveler.national_id}
      </Grid>
      <Grid item xs={6}>
        Guide:
      </Grid>
      <Grid item xs={6}>
        {traveler.is_guide ? <CheckOutlined/> : <CloseOutlined/>}
      </Grid>
      {/*<EditTravelerMenu traveler={traveler} />*/}

      {/*<ShowGuideReviews guideReviews={traveler.reviews || []} />*/}

      {/*<CreateGuideReviews guideId={traveler.id} />*/}
    </Grid>
  );
};

export default DisplayTravelerData;
