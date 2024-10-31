import { Grid } from "semantic-ui-react";
import EventList from "./EventList.tsx";
import { useAppSelector } from "../../../app/store/store.ts";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import { actions } from "../eventSlice.ts";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore.ts";

export default function EventDashboard() {
  const {data: events, status} = useAppSelector(state => state.events);
  const {loadCollection} = useFireStore('events');

  useEffect(() => {
    loadCollection(actions);
    }, [loadCollection]);

  if (status == 'loading') return <LoadingComponent />

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>  
  )
}