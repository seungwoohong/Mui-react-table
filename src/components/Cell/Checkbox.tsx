import React from "react";
import { TableToggleCommonProps } from "react-table";
import { Box } from "@material-ui/core";

const Checkbox = (
  { indeterminate, ...rest }: TableToggleCommonProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const defaultRef = React.useRef<{ indeterminate?: boolean }>();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    if (!defaultRef?.current) return;

    defaultRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <Box component="input" type="checkbox" ref={resolvedRef} {...rest} />;
};

export default React.forwardRef(Checkbox);
