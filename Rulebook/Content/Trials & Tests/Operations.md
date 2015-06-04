## Operations

### `+`
Addition. Same as mathematics! Isn’t this nice?

### `-`
Subtraction. Same as mathematics! Isn’t this also nice?
This also includes the priority before +.
Beware that negative numbers are possible, and that these are not the same as a subtraction operation - mind the space before and after the operation sign.

### `*`
A multiplication. Yes, you guessed it: Same as mathematics!
This also includes the priority before + and -.

### `/`
A division. No we’re not shitting you - Same as mathematics.
This also includes the priority before +, -, .
But divisions can quite easily become quite complex, so you will not find a lot of these and most of the time it will be very easy stuff like division by two (taking the half of the value before it).
As a rule of thumbs, resulting fractional numbers are rounded down, if not stated otherwise.

### `( )`
Brackets. These give priority to the term enclosed within. Same as in mathematics.
Heads up! - tests also use brackets to describe some relationships. These are not the same - again mind the spaces before and after normal brackets (there are none on the ones that the tests are using).

### `|( )|`
A numerical value will be placed inside that piped brackets. If it is negative, make it non-negative. 

### `Max( , )`
Two (or more) numerical values will be placed in these brackets, separated by commas. Only the higher value counts.

### `Min( , )`
Two (or more) numerical values will be placed in these brackets, separated by commas. Only the higher value counts.

---

### `>`
> Greater than

Now we’re getting into boolean logic - cool huh?
Before and after this sign two numerical values will be placed. If the first one is higher/greater than the second, this term results as “Success”. Otherwise as “Failure”.

### `>=`
> Greater than or equal

Same as before, but if both values are equal this term results as “Success”.

### `<`
> Smaller than

Now we’re getting into boolean logic - cool huh?
Before and after this sign two numerical values will be placed. If the first one is lower/smaller than the second, this term results as “Success”. Otherwise as “Failure”.

### `<=`
> Smaller than or equal

Same as before, but if both values are equal this term results as “Success”.

### `==`
> Equal

Before and after this sign two values will be placed. If they are equal, this term results as “Success”. Otherwise as “Failure”.

### `!=`
> Unequal

Before and after this sign two values will be placed. If they are not equal, this term results as “Success”. Otherwise as “Failure”.

### `!()`
> Inverse

A boolean value will be placed inside these brackets. If it is a success this term results as “Failure”. Otherwise as “Success”.

---

### `All( , )`
Two (or more) boolean values will be placed in these brackets, separated by commas.
If all are a success, the whole thing is a success.

```
    :? chance(DEX) && chance(STR)
```

The trial will be successful if both tests are successful.

### `Any( , )`
Two (or more) boolean values will be placed in these brackets, separated by commas.
If any of these is a success, the whole thing is a success.

```
    :? Any(chance(DEX), chance(STR))
```

The trial will be successful if either test is successful. Actually, try the first one, if it is a success, you don’t even need to try the other ones.
When tests have to be passed, you may choose the order in which you want to try them.
(You can either make the test on DEX first or the one on STR).

### `One( , )`
Ok this one seems similar to *Any* but is a bit more tricky.
Two (or more) boolean values will be placed in these brackets, separated by commas.
You have to choose one of them beforehand, and try to pass it. This operator will return the result of that test.
In other words, it means **"Choose any of that tests and pass it"**.

```
    :? One( chance(DEX), chance(STR) )
```

You can either try the test on DEX or the one on STR.