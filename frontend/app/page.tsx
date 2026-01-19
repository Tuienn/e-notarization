import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'

export default function TextFieldTailwind() {
    return (
        <FormControl>
            <InputLabel
                shrink
                htmlFor='component-outlined'
                className='pointer-events-auto relative top-0 left-0 mb-0.5 transform-none text-sm font-medium text-neutral-800 dark:text-neutral-200'
            >
                Name
            </InputLabel>
            <Input
                id='component-outlined'
                placeholder='Type your name'
                slotProps={{
                    root: {
                        className:
                            'mt-1 -ml-0.5 px-2 h-10 border-1 border-neutral-300 dark:border-neutral-700 rounded-md has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm before:hidden after:hidden'
                    },
                    input: {
                        className:
                            'placeholder:opacity-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500'
                    }
                }}
            />
            <FormHelperText className='ml-0'>Some important helper text</FormHelperText>
            <Button variant='contained' className='mt-4'>
                Submit
            </Button>
        </FormControl>
    )
}
