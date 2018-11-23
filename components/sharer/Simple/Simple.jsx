import { Formik, Form, Field, FieldArray } from 'formik'
import { Delete } from 'react-feather'
import styled from 'styled-components'

import Button from '../../styled/Button'
import Title from '../../styled/Title'

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

const SimpleSharer = ({ simpleCalc, players = [{ name: 'Knight', balance: '' }, { name: 'Druid', balance: '' }] }) => (
  <div>
    <Title>Simple Loot Sharer</Title>

    <Formik
      initialValues={{ players }}
      onSubmit={({ players }) => alert(JSON.stringify(simpleCalc(players), null, 2))}
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
                    className="is-rounded is-primary level-left"
                    type="button"
                    onClick={() => arrayHelpers.push('')}
                  >
                    Add player
                  </Button>
                  <Button className="is-rounded is-info level-right" type="submit">
                    Calculate
                  </Button>
                </div>
              </>
            )}
          />
        </Form>
      )}
    />
  </div>
)
export default SimpleSharer
