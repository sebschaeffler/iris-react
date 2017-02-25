/**
 * Material UI multi select
 *
 * Use with:
 * <MultiSelect fullWidth={true} value={this.state.values} onChange={(e,v) => this.setState({values: v})}>
 * 		<ListItem primaryText={"Option 1"} value={1} />
 * 		<ListItem primaryText={"Option 2"} value={2} />
 * 		<ListItem primaryText={"Option 3"} value={3} />
 * 		<ListItem primaryText={"Option 4"} value={4} />
 * </MultiSelect>
 *
 * this.state.values is an array of the values which are currently selected.
 **/
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from './DropDownMenu';
import Checkbox from 'material-ui/Checkbox';

function getStyles(props) {
  return {
    label: {
      paddingLeft: 0,
      top: props.floatingLabelText ? 6 : -4,
    },
    icon: {
      right: 0,
      top: props.floatingLabelText ? 8 : 0,
    },
    hideDropDownUnderline: {
      borderTop: 'none',
    },
    dropDownMenu: {
      display: 'block',
    },
  };
}

class MultiSelect extends Component {

  static defaultProps = {
    autoWidth: false,
    disabled: false,
    fullWidth: false,
  };


  render() {
    const styles = getStyles(this.props, this.context);
    const {
      autoWidth,
      children,
      style,
      labelStyle,
      iconStyle,
      id,
      underlineDisabledStyle,
      underlineFocusStyle,
      menuItemStyle,
      selectedMenuItemStyle,
      underlineStyle,
      errorStyle,
      disabled,
      floatingLabelFixed,
      floatingLabelText,
      floatingLabelStyle,
      hintStyle,
      hintText,
      fullWidth,
      errorText,
      listStyle,
      maxHeight,
      menuStyle,
      onFocus,
      onBlur,
      onChange,
      value,
      ...other
    } = this.props;

    return (
      <TextField
        {...other}
        style={style}
        disabled={disabled}
        floatingLabelFixed={floatingLabelFixed}
        floatingLabelText={floatingLabelText}
        floatingLabelStyle={floatingLabelStyle}
        hintStyle={hintStyle}
        hintText={(!hintText && !floatingLabelText) ? ' ' : hintText}
        fullWidth={fullWidth}
        errorText={errorText}
        underlineStyle={underlineStyle}
        errorStyle={errorStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        underlineDisabledStyle={underlineDisabledStyle}
        underlineFocusStyle={underlineFocusStyle}
      >
        <DropDownMenu
          disabled={disabled}
          style={Object.assign(styles.dropDownMenu, menuStyle)}
          labelStyle={Object.assign(styles.label, labelStyle)}
          iconStyle={Object.assign(styles.icon, iconStyle)}
          menuItemStyle={menuItemStyle}
          selectedMenuItemStyle={selectedMenuItemStyle}
          underlineStyle={styles.hideDropDownUnderline}
          listStyle={listStyle}
          autoWidth={autoWidth}
          maxHeight={maxHeight}
          value={value}
          onChange={onChange}
        >
          {children.map(item => {
            const actualValue = value === "" ? [] : value;
            let checkbox = <Checkbox
              checked={(actualValue || []).indexOf(item.props.value) >= 0}
              onCheck={(e, v) => {
                const index = actualValue.indexOf(item.props.value);
                if (v === true) {
                  if (index < 0) {
                    actualValue.push(item.props.value);
                    if (this.props.onChange) {
                      this.props.onChange(e, actualValue);
                    }
                  }
                } else {
                  if (index >= 0) {
                    actualValue.splice(index, 1);
                    if (this.props.onChange) {
                      this.props.onChange(e, actualValue);
                    }
                  }
                }
              }} />;
            return React.cloneElement(item, {
              leftCheckbox: checkbox
            });
          })
          }
        </DropDownMenu>
      </TextField>
    );
  }
}

export default MultiSelect;
