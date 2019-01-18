import { Formik, Form, Field, FieldArray } from 'formik'
import { Delete } from 'react-feather'
import styled from 'styled-components'

import Button from '../styled/Button'

const InputLine = styled.div`
  display: grid;
  grid-template-columns: auto auto 30px;
  grid-gap: 1rem;
  margin-bottom: 1rem;
`

const StyledDelete = styled(Delete)`
  align-self: center;
  color: red;
  cursor: pointer;
`

const SharerSimple = ({ onSubmit, players = [{ name: 'Knight', balance: 0 }, { name: 'Druid', balance: 0 }] }) => (
  <Formik
    initialValues={{ players }}
    onSubmit={onSubmit}
    render={({ values }) => (
      <Form>
        <FieldArray
          name="players"
          render={arrayHelpers => (
            <>
              {values.players.map((player, index) => (
                <InputLine key={index}>
                  <Field className="input" type="text" placeholder="Player Name" name={`players.${index}.name`} />

                  <Field
                    className="input"
                    type="number"
                    placeholder="Total Balance"
                    name={`players.${index}.balance`}
                  />
                  <StyledDelete onClick={() => arrayHelpers.remove(index)} />
                </InputLine>
              ))}
              <div className="level">
                <Button
                  className="is-primary level-left"
                  type="button"
                  onClick={() => arrayHelpers.push({ name: '', balance: 0 })}
                >
                  Add player
                </Button>
                <Button className="is-info level-right" type="submit">
                  Calculate
                </Button>
              </div>
            </>
          )}
        />
      </Form>
    )}
  />
)
export default SharerSimple
