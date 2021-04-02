import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstandlastname'
})
export class FirstAndLastNamePipe implements PipeTransform {

    transform(textContent: string): string {
        if (textContent.length > 0) {
            var name = textContent.slice(0, textContent.indexOf(" "));
            var lastName = textContent.slice(textContent.lastIndexOf(" "));

            var truncatedText = name + " " + lastName;
            return truncatedText;
        }
        return textContent;
    }

}