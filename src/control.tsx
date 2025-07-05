import { useState } from "react";

export function control(today: Date, limit: number) : number[]  {
  
  const errorIndices: number[] = [];

  console.log(today +" "+limit);
  let errorCount = 0;

  const rows = document.querySelectorAll<HTMLTableRowElement>('tbody > tr');

  console.log(rows)

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('th');
    if (cells.length < 4) {
      return;
    }

    const id = cells[1].textContent?.trim();
    const mailDateText = cells[2].textContent?.trim();
    const solutionDateText = cells[3].textContent?.trim();

    let solutionDate: Date;
    if (solutionDateText && solutionDateText !== '-' && solutionDateText !== '') {
      solutionDate = new Date(solutionDateText);
    } else {
      solutionDate = today;
    }

    const mailDate = new Date(mailDateText || '');

    if (isNaN(mailDate.getTime())) {
      return;
    }

    const diffTime = solutionDate.getTime() - mailDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    const shouldBeRed = diffDays > limit;

    const rowColor = row.style.backgroundColor;

    const isRed = rowColor === 'rgb(251, 234, 234)' || rowColor === '#fbeaea';

    if ((shouldBeRed && !isRed) || (!shouldBeRed && isRed)) {
      errorCount++;
      errorIndices.push(index);
    }

    console.log(errorCount+" "+id+" "+isRed +" "+shouldBeRed+" "+diffDays+" "+mailDate+" "+solutionDate)
  });

  return errorIndices;
}