import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Grid, CircularProgress, FormLabel, TextField, Box, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';

interface Props {
  handleSubmit: (
    {
      description,
      deadline,
    }: {
      description: string;
      deadline: Date;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      description: string;
      deadline: Date;
    }>,
  ) => void;
  description?: string;
  date?: string;
}

function TodoForm({ handleSubmit, description, date }: Props) {
  return (
    <Formik
      initialValues={{
        description: description ? description : '',
        deadline: date ? new Date(date) : new Date(),
      }}
      validationSchema={Yup.object().shape({
        description: Yup.string().required('Description is required'),
        deadline: Yup.date().required('Date is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container direction="row" justify="center" spacing={4}>
            <Grid item xs={11} md={9}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                id="description"
                multiline
                variant="outlined"
                fullWidth
                margin="none"
                name="description"
                placeholder="Details about what you want to do..."
                rows={4}
                helperText={touched.description ? errors.description : ''}
                error={touched.description && Boolean(errors.description)}
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={11} md={9}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <FormLabel htmlFor="date">Deadline</FormLabel>
                  <Grid container>
                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd MMM yyyy"
                          margin="none"
                          id="date"
                          name="date"
                          fullWidth
                          inputVariant="outlined"
                          value={values.deadline}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          onChange={(date:any) => setFieldValue('deadline', date)}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <SubmitButton type="submit" size="large" variant="contained" color="primary">
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'submit'}
            </SubmitButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default TodoForm;

const SubmitButton = styled(Button)`
  &&& {
    padding: 10px;
    width: 160px;
    height: 56px;
    border-radius: 0;
    margin-top: 16px;
    font-size: 16px;
    background-color: #000;
    font-weight: bold;
  }
`;
