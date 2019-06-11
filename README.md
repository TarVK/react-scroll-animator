# react-scroll-animator
This package aims to provide a minimal set of generic tools that allow complicated scroll animation sequences to be defined in a concise way using the power of React.
The progress of these animations is determined by the scroll location of the page.

Please execuse the looks of the examples to follow, little time was spent on their appearance, the main goal was to show the features.

# Installation

```
npm install react-scroll-animator --save
```

```jsx
import {Animator} from "react-scroll-animator";
```


# Usage 
The core aspect of scroll-animator is the actual Animator component. This component allows you to define multiple sections of the animation, and at what scroll offset, relative to the previous section, they should start.
The corresponding variables will increase from 0-1 in sequence, as the user scrolls the specified distance.

Consider [this basic example](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/basicsPage.tsx), and its [result](https://tarvk.github.io/react-scroll-animator/examples/build/#/basics)
```jsx
{/* Create an animator instance and specify the animation sections and their ranges */}
<Animator sections={[{$margin: 300}, {$text: 200}]}>
    {({$margin, $text}) => (
        // Create the content to show, uusing the passed section variables whose values range from 0 to 1
        <div
            style={{
                backgroundColor: "orange",
                position: "relative",
                top: 800,
                height: 20,
                /* Use map to map the values from 0-200 and apply easing (argument 0 may be left out) */
                marginLeft: map($margin, 0, 200, {easing: "easeInOutSin"})
            }}>
            {/* Use the map function to map 0-1 to the integers 0-lengthOfText */}
            {text.substring(0, map($text, text.length, {digits: 0}))}
        </div>
    )}
</Animator>
```

## Map

The package contains a simple map function, that takes 4 arguments, of which the second is optional:
```
map(progress, start, end, options);
progress: value from 0-1
start: the value that progress 0 should map to (optional, defaults to 0)
end: the value that progress 1 should map to
options: {
    digits: The number of decimals to round to (no rounding by default)
    easing: The name of a easing function to apply (linear by default)
}
```
See the available easing methods [here](https://github.com/TarVK/react-scroll-animator/blob/master/src/easing.tsx)


## Once

Animations that you don't want to reset when the user scrolls back up, can use the second callbackParameter. This parameter will be the greatest value that each section has had so far.
```jsx
<Animator sections={[{$margin: 300}, {$text: 200}]}>
    {({$margin, $text}, {$margin: $marginMax, $text: $textMax}) => (
        // $marginMax will be the largetst value for $margin that has been passed so far, the same applies to $textMax and $text
        <div>...</div>
    )}
</Animator>
```

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/once) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/oncePage.tsx)

## Latest

latest can be used to pick the latest value from a set of variables, this way you can animate the same property, using multiple sections. This is usefull when you want a break in a transition, or reverse it at some moment.
```
latest(sections, values);
sections: A list of the section variables that map to the values
values: A list of values to use to return the latest from
```

```jsx
<div
    style={{
        marginLeft: latest(
            [$left1, $left2],
            [
                map($left1, 0, 200),
                map($left2, 200, 400),
            ]
        )
    }}>
    ...
</div>
```

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/combine) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/combinePage.tsx)


## Stagger

The animator component also allows sections to define an offset, in order to start a section some delay before or after the previous one has finished.

```jsx
<Animator
    sections={[
        {$s1: 300},
        {$s2: 300, offset: -250},
        {$s3: 300, offset: -250},
        {$s4: 300, offset: -250},
        {$s5: 300, offset: -250},
        {$d: 300},
    ]}>
    ...
</Animator>
```

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/stagger) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/staggerPage.tsx)

## Parallel

The animator component allows sequences of sections to be executed in parallel, by putting a sequence (array of sections) in an array. This can be useful when animating different independent components that move at the same time.

```jsx
<Animator
    sections={[
        {$start: 300},
        [
            [{$1s1: 150}, {$2s1: 100}, {$3s1: 100}],
            [{$1s2: 100}, {$2s2: 100}, {$3s2: 100}],
        ],
        {$end: 100}
    ]}>
    ...
</Animator>
```

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/parallel) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/parallelPage.tsx)

## Css

As one might expect, this library can easily be used together with css animations. One can easily activate the animation at a certain point by adding or removing a class at some threshold.

```jsx
<div className={"box1" + ($box1 == 1 ? " active" : "")} />
```

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/css) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/cssPage.tsx)

## Pin

When you want an element to only scroll at certain moments on the page, you can make use of the Pin component. This component will only scroll during the passed sections.

The Animator component allows for a section's range to be defined as a `start` and `end` value, such that the actual animation scroll distance will be its delta. And the Pin component can then read these `start` and `end` values to determine what locations to scroll to. 

```jsx
const h = document.body.clientHeight;
<Animator
    sections={[
        {$scrollIn: [h, h / 2]},
        {$something: 300},
        {$scrollOut: [h / 2, -30]}
    ]}>
    {({$scrollIn, $something, $scrollOut}) => (
        <Pin sections={{$scrollIn, $scrollOut}}>
            ...
        </Pin>
    )}
</Animator>
```

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/pin) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/pinPage.tsx)

## Reference

Since you probably don't want to hardcode in locations for elements (assuming you want a design that's at least somewhat responsive) a method for creating element references is provided. This allows you to wrap your element in a `Reference` component, and retrieve the location and size of that reference.

```jsx
<RefCreator>
    {([Ref]) => (
        <div>
            {/* Create a refence element */}
            <Ref>
                <div
                    style={{display: "inline-block"}}>
                    Hello text
                    <br /> test
                </div>
            </Ref>

            {/* Create an element with the same size as the reference element*/}
            <div
                style={{
                    width: Ref.width,
                    height: Ref.height,
                    display: "inline-block"
                }}>
                Yes
            </div>
        </div>
    )}
</RefCreator>
```

The `RefCreator` has one property `count`, which defines the number of Reference components you want to retrieve in the passed array.

Each reference will contain the variables `x`, `y`, `width`, `height` and the referenced element `element`, where the `x` and `y` are relative to the page. They also contain a method `update` for updating these variables, since they won't update as the element changes, and `refresh` to call the render method of `RefCreator` again, in order to update all dependencies on the reference.

See the [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/reference) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/referencePage.tsx)

### Templating

These references can be used very neatly to create a template of what you want your page in different 'scenes' to look like, while allowing for a responsive design, and then make complex transitions between these.

In the example below, try making the view port small enough such that the 2 containers don't fit next to each other, the animation will still work properly.

This can be seen in this [example](https://tarvk.github.io/react-scroll-animator/examples/build/#/reference) and its [code](https://github.com/TarVK/react-scroll-animator/blob/master/examples/src/pages/referencePage.tsx)

# Contributing

Any contributions to the package are welcome. Currently the main points of interests however are:
-   Making type declaration cleaner, and trying to support the nested parallel sequences
-   Trying to improve performance by only recomputing percenteges that have changed
-   Making nicer looking examples, and potentially a proper website

