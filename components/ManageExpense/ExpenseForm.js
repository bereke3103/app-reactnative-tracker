import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import InputCustom from './InputCustom';
import ButtonCustom from '../UI/ButtonCustom';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constans/styles';

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValue,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      //isValid: defaultValue ? true : false,
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : '',
      //isValid: defaultValue ? true : false,
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      //isValid: defaultValue ? true : false,
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amointIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionValid = expenseData.description.trim().length > 0;

    if (!amointIsValid || !dateIsValid || !descriptionValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amointIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionValid,
          },
          date: { value: curInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <InputCustom
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          label={'Amount'}
          textInputConfig={{
            keyboardType: 'number-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <InputCustom
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          label={'Date'}
          textInputConfig={{
            placeholder: 'YYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <InputCustom
        label={'Description'}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          //autoCapitalize: 'none',
          // autocorrect: false, //default is true
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <ButtonCustom style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </ButtonCustom>
        <ButtonCustom style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </ButtonCustom>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
