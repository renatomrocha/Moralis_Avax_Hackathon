
import {Text} from '@chakra-ui/react';

export default function Title(props: any) {
    return(<div style={{margin:20}}>
        <Text fontSize='2xl'>{props.title}</Text>
    </div>)
}