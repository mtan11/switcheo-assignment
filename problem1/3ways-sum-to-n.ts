// Just use Mathematical Formula
// Most efficient in terms of time complexity
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

// Just use a iterative loop to loop through every value 
// and maybe have problem when the n is too big.
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Only suitable for smaller values and the less effective way
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
}
