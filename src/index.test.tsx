import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import PopoverSearchIcon from './';

const renderWithMantineProvider = (ui: React.ReactElement) => {
    return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('PopoverSearchIcon Component', () => {
    test('renders the Select Icon button', () => {
        renderWithMantineProvider(<PopoverSearchIcon />);
        expect(screen.getByText('Select Icon')).toBeInTheDocument();
    });

    test('opens the popover on button click', async () => {
        renderWithMantineProvider(<PopoverSearchIcon />);
        fireEvent.click(screen.getByText('Select Icon'));
        await waitFor(() => expect(screen.getByPlaceholderText('Search icons')).toBeInTheDocument());
    });

    test('filters icons based on search input', async () => {
        renderWithMantineProvider(<PopoverSearchIcon />);
        fireEvent.click(screen.getByText('Select Icon'));
        await waitFor(() => expect(screen.getByPlaceholderText('Search icons')).toBeInTheDocument());

        fireEvent.change(screen.getByPlaceholderText('Search icons'), { target: { value: 'chrome' } });

        await waitFor(() => {
            const chromeIcon = document.querySelector('.fa-chrome');
            expect(chromeIcon).toBeInTheDocument();
        });
    });

    test('calls onClick with the correct icon name', async () => {
        const handleClick = jest.fn();
        renderWithMantineProvider(<PopoverSearchIcon onSelect={handleClick} />);
        fireEvent.click(screen.getByText('Select Icon'));
        await waitFor(() => expect(screen.getByPlaceholderText('Search icons')).toBeInTheDocument());

        fireEvent.change(screen.getByPlaceholderText('Search icons'), { target: { value: 'chrome' } });

        await waitFor(() => {
            const chromeIcon = document.querySelector('.fa-chrome');
            expect(chromeIcon).toBeInTheDocument();
        });
    });
});