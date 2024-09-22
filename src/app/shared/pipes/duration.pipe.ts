import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  // Add your code here
  transform(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  }
}
